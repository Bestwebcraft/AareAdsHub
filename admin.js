document.addEventListener('DOMContentLoaded', () => {
  // Handle form submission
  const balanceForm = document.getElementById('balanceForm');
  balanceForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const recipient = document.getElementById('recipient').value;
      const amount = document.getElementById('amount').value;

      if (recipient && amount) {
          iziToast.success({
              title: 'Success',
              message: `Balance transferred to ${recipient}`,
              position: 'bottomLeft',
          });
          // Reset form
          balanceForm.reset();
      } else {
          iziToast.error({
              title: 'Error',
              message: 'Please fill in all fields',
              position: 'bottomRight',
          });
      }
  });
});
