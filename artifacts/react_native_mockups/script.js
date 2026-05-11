let selectedOption = null;

function selectOption(el, opt) {
  if (document.getElementById('submitBtn').innerText === '已提交') return;
  
  // Clear other active options
  document.querySelectorAll('.opt-btn').forEach(btn => btn.classList.remove('active'));
  
  // Set current active
  el.classList.add('active');
  selectedOption = opt;
  
  // Enable submit button
  document.getElementById('submitBtn').disabled = false;
}

function showWillingnessModal() {
  document.getElementById('willingnessModal').style.display = 'flex';
}

function showSuccessModal() {
  document.getElementById('willingnessModal').style.display = 'none';
  document.getElementById('successModal').style.display = 'flex';
}

function closeModals() {
  document.getElementById('successModal').style.display = 'none';
  
  // Update state to "Submitted"
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = '已提交';
  submitBtn.disabled = true;
  
  // Lock options
  document.querySelectorAll('.opt-btn').forEach(btn => {
    btn.style.cursor = 'default';
    if (!btn.classList.contains('active')) {
      btn.style.opacity = '0.6';
    }
  });
}
