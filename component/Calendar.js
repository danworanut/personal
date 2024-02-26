// Calendar.js
import React from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { format } from 'date-fns';

export default function Calendar() {
  const [openform, setOpenform] = useState(false);
  let titles = '';
  let calendarInfo;
  const [info, setInfo] = useState();
  const [values, setValues] = useState([])
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedValues = localStorage.getItem('value');
    if (storedValues) {
      setValues(JSON.parse(storedValues));
      console.log(values)
    }
  }, []);

  useEffect(() => {
    updateCalendarEvents(values);
  }, [values]);


  const headerToolbarOptions = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek',
  };

  const handleEventClick = (info) => {
    setOpenform(true);
    setInfo(info)

  };

  const handleCloseButtonClick = () => {
    setOpenform(false);
  };

  const onChangeValues = (e) => {
    // console.log(e.target.value);
    // setValues({ ...values, [e.target.name]: e.target.value })
    titles = e.target.value
    //console.log(titles)
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = () => {
    if (titles) {
      const newValues = {
        id: values.length + 1,
        title: titles,
        start: info.startStr,
        end: info.endStr,
        color: getRandomColor()
      }
      setValues([...values, newValues]);
      localStorage.setItem('value', JSON.stringify([...values, newValues]));
      updateCalendarEvents([...values, newValues]);
      setOpenform(false);
    }
  }


  const updateCalendarEvents = (newEvents) => {
    const updatedEvents = newEvents.map(event => ({ title: event.title, start: event.start, end: event.end, color: event.color }));
    setEvents(updatedEvents);
  }
  
  const deleteValue = (id) => {
    const updatedValues = [...values];
    const index = updatedValues.findIndex(value => value.id === id); // Fix the typo here
    updatedValues.splice(index, 1);
    setValues(updatedValues);
    localStorage.setItem('value', JSON.stringify(updatedValues)); // Fix the localStorage key here
    updateCalendarEvents(updatedValues);
  }


  return (
    <>
      <div>

        <center><h3 className='calen-head'>My Calendar App</h3></center>
        <div className='container'>
          <div className='left'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventColor={(event) => event.color}
              headerToolbar={headerToolbarOptions}
              selectable={true}
              select={handleEventClick}
              height="600px"
            />
          </div>
          <div className='right'>
            <center>
              <div className='header'>Activity</div>
            </center>

            <div className='event-container'>
              {values.map((value, index) => (
                <div className='event-calen-box' style={{ backgroundColor: value.color }}>
                  <div key={index}>
                    <div className='centent'>
                      <div className='content-box'>
                        <div className='title-event'>
                          {value.title}
                        </div>
                        <div className='date-event'>
                          {format(new Date(value.start), 'dd/MM/yyyy')} - {format(new Date(value.end), 'dd/MM/yyyy')}
                        </div>
                      </div>
                      <div className='btn-box visible'>
  
                        <button className='delete-btn' >
                          <box-icon type='solid' color="white" name='message-alt-x' onClick={() => deleteValue(value.id)} ></box-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


            </div>


          </div>
        </div>

      </div>

      {openform && (
        <>
          <div className='blur'></div>
          <div className='todo-container'>
            <div className='form-container'>

              <div className='close-btn' >
                <span role="img" aria-label="delete" onClick={handleCloseButtonClick} >
                  ❌
                </span>
              </div>
              <center><h2>Add Activity</h2></center>
              <form>
                <div className="user-box ">
                  <input
                    type="text"
                    name="title"
                    onChange={onChangeValues}
                  />
                  <label>Title</label>
                </div>
                {/* <div className="user-box ">
                  <input
                    type="text"
                    name="title"
                    onChange={onChangeValues}
                  />
                  <label>Start Date</label>
                </div>

                <div className="user-box ">
                  <input
                    type="text"
                    name="title"
                    onChange={onChangeValues}
                  />
                  <label>End Date</label>
                </div> */}



                <center><button type="button" className="submit-btn" id="bottone1"
                  onClick={handleSubmit}
                ><strong>Submit</strong></button>
                </center>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

