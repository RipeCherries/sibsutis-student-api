import React from "react";
import { PiCalendarFill } from "react-icons/pi";

import "./last-update-section.css";

const LastUpdateSection = () => {
    return (
      <section className="last-update-section">
          <div className="last-update-section__info">
              <PiCalendarFill size={40} />
              <p className="last-update-section__info__text">Дата последнего обновления:</p>
              <p className="last-update-section__info__date">04.08.2023 11:25</p>
          </div>

      </section>
    );
}

export default LastUpdateSection;