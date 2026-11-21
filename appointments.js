(function () {
  const storageKey = 'medease_appointments';

  function getAll() {
    const storedAppointments = localStorage.getItem(storageKey);
    if (!storedAppointments) return [];

    let appointments;
    try {
      appointments = JSON.parse(storedAppointments);
    } catch (error) {
      throw new Error('Saved appointment data is unreadable.');
    }

    if (!Array.isArray(appointments)) {
      throw new Error('Saved appointment data has an invalid format.');
    }

    return appointments;
  }

  function add(appointment) {
    const required = ['id', 'doctor', 'specialty', 'date', 'time', 'patientName'];
    if (!appointment || required.some((field) => !String(appointment[field] || '').trim())) {
      throw new Error('Appointment details are incomplete.');
    }

    const appointments = getAll();
    if (appointments.some((saved) => saved.id === appointment.id)) {
      throw new Error('This appointment has already been saved.');
    }
    appointments.unshift({ ...appointment, status: appointment.status || 'Confirmed' });
    localStorage.setItem(storageKey, JSON.stringify(appointments));
  }

  function getById(id) {
    return getAll().find((appointment) => appointment.id === String(id)) || null;
  }

  window.MedEaseAppointments = { getAll, add, getById };
})();
