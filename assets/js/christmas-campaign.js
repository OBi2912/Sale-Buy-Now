/**
 * Calendario anual de la campaña de Navidad de Sale Buy Now.
 *
 * La promoción se activa sola todos los años del 15 de noviembre al 5 de enero
 * a las 23:59:59 (hora local del visitante). Fuera de esas fechas, la web
 * oculta la publicidad navideña y vuelve a mostrar los precios normales.
 *
 * Para desactivar la campaña temporalmente, pon `enabled: false`.
 * Para cambiar las fechas, edita `startMonth`, `startDay`, `endMonth` y `endDay`.
 * El porcentaje de descuento vive en los precios de index.html, no aquí.
 */
(function (global) {
  'use strict';

  const config = {
    enabled: true,
    startMonth: 11,
    startDay: 15,
    endMonth: 1,
    endDay: 5,
    endTime: '23:59:59'
  };

  function makeDate(year, month, day, time, endOfDay) {
    const [hours, minutes, seconds] = String(time || '00:00:00')
      .split(':')
      .map(Number);

    return new Date(
      year,
      month - 1,
      day,
      hours || 0,
      minutes || 0,
      seconds || 0,
      endOfDay ? 999 : 0
    );
  }

  /**
   * Devuelve la ventana de campaña que corresponde a una fecha.
   * Del 1 al 5 de enero, la ventana empezó el 15 de noviembre del año anterior.
   */
  function getCampaignWindow(date) {
    const now = date instanceof Date ? date : new Date(date || Date.now());
    const inEndMonth =
      now.getMonth() === config.endMonth - 1 && now.getDate() <= config.endDay;
    const startYear = inEndMonth ? now.getFullYear() - 1 : now.getFullYear();

    const start = makeDate(startYear, config.startMonth, config.startDay, '00:00:00', false);
    const end = makeDate(startYear + 1, config.endMonth, config.endDay, config.endTime, true);
    const active = Boolean(config.enabled) && now >= start && now <= end;

    return { start, end, active, startYear };
  }

  /**
   * Próximo 15 de noviembre. Sirve para saber cuándo vuelve la campaña.
   */
  function getNextStart(date) {
    const now = date instanceof Date ? date : new Date(date || Date.now());
    const thisYearStart = makeDate(
      now.getFullYear(),
      config.startMonth,
      config.startDay,
      '00:00:00',
      false
    );

    if (now < thisYearStart) return thisYearStart;

    return makeDate(
      now.getFullYear() + 1,
      config.startMonth,
      config.startDay,
      '00:00:00',
      false
    );
  }

  function isActive(date) {
    return getCampaignWindow(date).active;
  }

  global.ChristmasCampaign = {
    config: config,
    getCampaignWindow: getCampaignWindow,
    getNextStart: getNextStart,
    isActive: isActive
  };

  // Set the state before the body is parsed so off-season advertising never flashes.
  if (global.document && global.document.documentElement) {
    global.document.documentElement.setAttribute(
      'data-christmas-campaign',
      isActive() ? 'on' : 'off'
    );
  }
})(window);
