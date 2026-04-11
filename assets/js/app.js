let activeTab = "bus";
let tripType = "oneway";
let selectedBooking = null;

function populateDatalist(listId, items) {
  const $list = $("#" + listId);
  $list.empty();
  items.forEach(item => {
    $list.append(`<option value="${item}"></option>`);
  });
}

function updateSearchLabels() {
  const label = activeTab === "flights" ? "Flight" : activeTab === "train" ? "Train" : "Bus";
  $("#ticketTitle").text(label + " Tickets");
  $("#fromInput").attr("placeholder", `From (${label})`);
  $("#toInput").attr("placeholder", `To (${label})`);
  $("#ticketTypeLabel").text(label + " Only");

  const operatorLabel =
    activeTab === "flights" ? "Airline" :
    activeTab === "train" ? "Train Operator" :
    "Bus Operator";

  $("#operatorHeading").text(operatorLabel);

  const cities = getCities(activeTab);
  populateDatalist("fromCities", cities);
  populateDatalist("toCities", cities);
  renderOperatorFilters();
  renderAmenityFilters();
}

function renderOperatorFilters() {
  const operators = [...new Set(APP_DATA.routes[activeTab].map(r => r.operator))];
  const $wrap = $("#operatorFilters");
  $wrap.empty();

  operators.forEach((operator, index) => {
    const id = `operator_${index}`;
    $wrap.append(`
      <div class="form-check mb-2">
        <input class="form-check-input operator-filter" type="checkbox" value="${operator}" id="${id}">
        <label class="form-check-label" for="${id}">${operator}</label>
      </div>
    `);
  });
}

function renderAmenityFilters() {
  const amenities = [...new Set(APP_DATA.routes[activeTab].flatMap(r => r.amenities))];
  const $wrap = $("#amenityFilters");
  $wrap.empty();

  amenities.forEach((amenity, index) => {
    const id = `amenity_${index}`;
    $wrap.append(`
      <div class="form-check mb-2">
        <input class="form-check-input amenity-filter" type="checkbox" value="${amenity}" id="${id}">
        <label class="form-check-label" for="${id}">${amenity}</label>
      </div>
    `);
  });
}

function renderResults() {
  const fromValue = ($("#fromInput").val() || "").trim().toLowerCase();
  const toValue = ($("#toInput").val() || "").trim().toLowerCase();
  const sortBy = $("#sortBy").val();

  const selectedTimes = $(".time-filter:checked").map(function () {
    return $(this).val();
  }).get();

  const selectedOperators = $(".operator-filter:checked").map(function () {
    return $(this).val();
  }).get();

  const selectedAmenities = $(".amenity-filter:checked").map(function () {
    return $(this).val();
  }).get();

  let data = APP_DATA.routes[activeTab].filter(item => {
    const fromMatch = !fromValue || item.from.toLowerCase().includes(fromValue);
    const toMatch = !toValue || item.to.toLowerCase().includes(toValue);
    const timeMatch = selectedTimes.length === 0 || selectedTimes.includes(getTimeBucket(item.departTime));
    const operatorMatch = selectedOperators.length === 0 || selectedOperators.includes(item.operator);
    const amenitiesMatch = selectedAmenities.length === 0 ||
      selectedAmenities.every(a => item.amenities.includes(a));

    return fromMatch && toMatch && timeMatch && operatorMatch && amenitiesMatch;
  });

  if (sortBy === "earliest") data.sort((a, b) => a.departTime.localeCompare(b.departTime));
  if (sortBy === "latest") data.sort((a, b) => b.departTime.localeCompare(a.departTime));
  if (sortBy === "cheapest") data.sort((a, b) => a.price - b.price);
  if (sortBy === "highest") data.sort((a, b) => b.price - a.price);
  if (sortBy === "seats-high") data.sort((a, b) => b.seats - a.seats);
  if (sortBy === "seats-low") data.sort((a, b) => a.seats - b.seats);

  $("#resultsTitle").text(`${$("#fromInput").val() || "Any City"} → ${$("#toInput").val() || "Any Destination"}`);
  $("#resultsCount").text(data.length);

  const $results = $("#resultsList");
  $results.empty();

  if (!data.length) {
    $results.append(`<div class="result-card"><p class="mb-0 text-muted fs-4">No matching routes found.</p></div>`);
    return;
  }

  data.forEach(item => {
    $results.append(`
      <div class="result-card">
        <div class="row align-items-center g-4">
          <div class="col-md-3">
            <div class="fs-1 fw-bold">${item.departTime}</div>
            <div class="text-muted">${item.operator}</div>
          </div>
          <div class="col-md-4">
            <div class="fs-3 fw-bold">${item.from} → ${item.to}</div>
            <div class="text-muted mt-1">Arrival: ${item.arrivalTime}</div>
            <div class="small text-secondary mt-2">${item.amenities.join(" • ")}</div>
          </div>
          <div class="col-md-2">
            <div class="fs-2 fw-bold">${item.seats}</div>
            <div class="text-muted">Seats</div>
          </div>
          <div class="col-md-3 text-md-end">
            <div class="result-price mb-3">$${item.price.toFixed(2)}</div>
            <button class="select-btn" data-id="${item.id}">Select</button>
          </div>
        </div>
      </div>
    `);
  });
}

function showBooking(itemId) {
  const item = APP_DATA.routes[activeTab].find(r => r.id === Number(itemId));
  if (!item) return;
  selectedBooking = item;
  $("#bookingSection").show();
  window.location.hash = "bookingSection";
}

function confirmBooking() {
  const fullName = $("#fullName").val().trim();
  const email = $("#email").val().trim();
  const confirmEmail = $("#confirmEmail").val().trim();
  const phone = $("#phone").val().trim();
  const passengerName = $("#passengerName").val().trim();
  const idNumber = $("#idNumber").val().trim();

  $("#formError").addClass("d-none").text("");
  $("#bookingSuccess").addClass("d-none").text("");

  if (!fullName || !email || !confirmEmail || !phone || !passengerName || !idNumber) {
    $("#formError").removeClass("d-none").text("Please fill all required fields.");
    return;
  }

  if (!validEmail(email)) {
    $("#formError").removeClass("d-none").text("Please enter a valid Email Address.");
    return;
  }

  if (!validEmail(confirmEmail)) {
    $("#formError").removeClass("d-none").text("Please re-enter a valid Email Address.");
    return;
  }

  if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
    $("#formError").removeClass("d-none").text("Email Address and Re-Enter Email Address must match.");
    return;
  }

  const ref = "SB-" + Math.floor(100000 + Math.random() * 900000);
  $("#bookingSuccess")
    .removeClass("d-none")
    .html(`<strong>Booking Confirmed</strong><br>Thank you, ${fullName}. Your booking has been received.<br>Reference Number: <strong>${ref}</strong>`);
}

$(function () {
  updateSearchLabels();
  renderResults();

  $(document).on("click", ".tab-btn", function () {
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");
    activeTab = $(this).data("tab");
    updateSearchLabels();
    renderResults();
  });

  $(document).on("click", ".trip-btn", function () {
    $(".trip-btn").removeClass("active");
    $(this).addClass("active");
    tripType = $(this).data("trip");
    $("#returnDateWrap").toggle(tripType === "round");
  });

  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    renderResults();
  });

  $("#sortBy").on("change", renderResults);
  $(document).on("change", ".time-filter, .operator-filter, .amenity-filter", renderResults);

  $("#resetFilters").on("click", function () {
    $(".time-filter, .operator-filter, .amenity-filter").prop("checked", false);
    $("#sortBy").val("earliest");
    renderResults();
  });

  $(document).on("click", ".select-btn", function () {
    showBooking($(this).data("id"));
  });

  $("#confirmEmail").on("paste copy cut", function (e) {
    e.preventDefault();
  });

  $("#confirmBookingBtn").on("click", function () {
    confirmBooking();
  });
});