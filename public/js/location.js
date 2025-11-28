async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

async function loadCountries(selectId) {
  const countries = await fetchJSON('/location/countries');
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Select Country</option>';
  countries.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

async function loadStates(countryName, stateSelectId) {
  const sel = document.getElementById(stateSelectId);
  if (!sel || !countryName) return;
  const states = await fetchJSON('/location/states/' + encodeURIComponent(countryName));
  sel.innerHTML = '<option value="">Select State</option>';
  states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = s.name;
    sel.appendChild(opt);
  });
}

async function loadCities(countryName, stateName, citySelectId) {
  const sel = document.getElementById(citySelectId);
  if (!sel || !countryName || !stateName) return;
  const cities = await fetchJSON('/location/cities/' + encodeURIComponent(countryName) + '/' + encodeURIComponent(stateName));
  sel.innerHTML = '<option value="">Select City</option>';
  cities.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function initLocationDropdowns(countryId, stateId, cityId) {
  const countryEl = document.getElementById(countryId);
  const stateEl = document.getElementById(stateId);
  const cityEl = document.getElementById(cityId);
  if (!countryEl || !stateEl || !cityEl) return;

  loadCountries(countryId).catch(console.error);

  countryEl.addEventListener('change', async (e) => {
    const country = e.target.value;
    cityEl.innerHTML = '<option value="">Select City</option>';
    await loadStates(country, stateId).catch(console.error);
  });

  stateEl.addEventListener('change', async (e) => {
    const country = countryEl.value;
    const state = e.target.value;
    await loadCities(country, state, cityId).catch(console.error);
  });
}

window.initLocationDropdowns = initLocationDropdowns;
