const calendar = (() => {
  const locale = 'pt-BR';
  const monthLabel = document.getElementById('mes-ano');
  const daysContainer = document.getElementById('dias-calendario');
  const prevButton = document.getElementById('mes-anterior');
  const nextButton = document.getElementById('mes-seguinte');

  const today = new Date();
  let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const formatMonthYear = (date) => {
    return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
  };

  const clearDays = () => {
    daysContainer.innerHTML = '';
  };

  const buildDayItem = (day, opts = {}) => {
    const item = document.createElement('div');
    item.className = 'dia';
    item.textContent = String(day);

    if (opts.isToday) {
      item.classList.add('today');
      item.setAttribute('aria-current', 'date');
    }

    if (opts.outsideMonth) {
      item.classList.add('outside-month');
      item.setAttribute('aria-hidden', 'true');
    }

    return item;
  };

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthLabel.textContent = formatMonthYear(date);

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastOfMonth.getDate();

    const startWeekDay = firstOfMonth.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    clearDays();

    // Fill leading days from previous month
    for (let i = startWeekDay - 1; i >= 0; i -= 1) {
      const dayNumber = prevMonthLastDay - i;
      const item = buildDayItem(dayNumber, { outsideMonth: true });
      daysContainer.appendChild(item);
    }

    // Fill current month days
    for (let day = 1; day <= daysInMonth; day += 1) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const item = buildDayItem(day, { isToday });
      daysContainer.appendChild(item);
    }

    // Fill trailing days of next month to complete the last week (optional)
    const totalCells = daysContainer.children.length;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      const needed = 7 - remainder;
      for (let i = 1; i <= needed; i += 1) {
        const item = buildDayItem(i, { outsideMonth: true });
        daysContainer.appendChild(item);
      }
    }
  };

  const navigate = (offset) => {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
  };

  const init = () => {
    if (!monthLabel || !daysContainer || !prevButton || !nextButton) return;

    prevButton.addEventListener('click', () => navigate(-1));
    nextButton.addEventListener('click', () => navigate(1));

    renderCalendar(currentDate);
  };

  return { init };
})();

calendar.init();
