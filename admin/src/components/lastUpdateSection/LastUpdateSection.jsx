import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PiCalendarFill } from "react-icons/pi";

import "./last-update-section.css";
import axios from "axios";
import {setLastUpdate} from "../../store/lastUpdateReducer";

const LastUpdateSection = () => {
    const lastUpdate = useSelector(store => store.lastUpdate.date);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/last-update').then(response => {
            const data = response.data;
            const lastUpdateDate = new Date(data.date);
            dispatch(setLastUpdate(lastUpdateDate));
        }).catch(error => {
           console.log(error);
        });
    }, [dispatch]);

    return (
      <section className="last-update-section">
          <div className="last-update-section__info">
              <PiCalendarFill size={40} />
              <p className="last-update-section__info__text">Дата последнего обновления:</p>
              {
                  lastUpdate ? (
                      <p className="last-update-section__info__date">{lastUpdate.toLocaleString()}</p>
                  ) : (
                      <p className="last-update-section__info__date">Загрузка...</p>
                  )
              }
          </div>
      </section>
    );
}

export default LastUpdateSection;