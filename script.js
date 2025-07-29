// Parse GET parameters into an object
function getParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

document.addEventListener('DOMContentLoaded', () => {
  const params = getParams();
  const grantUrl = params.base_grant_url;               // Meraki’s grant URL
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // 1. Send email to your Zapier Webhook
    fetch('https://hooks.zapier.com/hooks/catch/​<YOUR_ZAP_ID>/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    })
    .finally(() => {
      // 2. Then grant Wi‑Fi access
      window.location.href = grantUrl + '&email=' + encodeURIComponent(email);
    });
  });
});
