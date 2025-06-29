function formatNumberInput(input) {
  const raw = input.value.replace(/,/g, '').trim();
  if (raw === '') return;
  const num = parseFloat(raw);
  if (!isNaN(num)) {
    input.value = Number.isInteger(num) ? num.toLocaleString() : num.toFixed(2).toLocaleString();
  }
}
function getNumber(id) {
  const val = document.getElementById(id).value.replace(/,/g, '').trim();
  return parseFloat(val) || 0;
}
function calculate() {
  const tax = getNumber('tax');
  const s5 = getNumber('s5');
  const s4 = getNumber('s4');
  const s3 = getNumber('s3');
  const s2 = getNumber('s2');
  const s1 = getNumber('s1');
  const dia = getNumber('dia');
  const rate = getNumber('rate');
  const total_people = s5 + s4 + s3 + s2 + s1;
  const total_score = s5 * 5 + s4 * 4 + s3 * 3 + s2 * 2 + s1;
  if (total_score === 0) {
    alert('總分為 0，無法計算');
    return;
  }
  const per_score = Math.floor(tax / total_score);
  const r_5 = per_score * 5;
  const r_4 = per_score * 4;
  const r_3 = per_score * 3;
  const r_2 = per_score * 2;
  const r_1 = per_score * 1;
  const dia_zeny = rate !== 0 ? Math.floor(dia * 1000000 / rate) : 0;
  document.getElementById('r_people').value = total_people.toLocaleString();
  document.getElementById('r_score').value = total_score.toLocaleString();
  document.getElementById('r_per').value = per_score.toLocaleString();
  document.getElementById('r_5').value = r_5.toLocaleString();
  document.getElementById('r_4').value = r_4.toLocaleString();
  document.getElementById('r_3').value = r_3.toLocaleString();
  document.getElementById('r_2').value = r_2.toLocaleString();
  document.getElementById('r_1').value = r_1.toLocaleString();
  document.getElementById('r_dia').value = dia_zeny.toLocaleString();
}
window.onload = () => {
  document.getElementById('calculate').onclick = calculate;
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('change', () => formatNumberInput(input));
  });
  document.querySelectorAll('button.copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const raw = document.getElementById(id).value.replace(/,/g, '');
      navigator.clipboard.writeText(raw);
    });
  });
};