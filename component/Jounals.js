import React from 'react'
import { useState, useEffect } from 'react';

export default function Jounals() {

  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalTitle, setJournalTitle] = useState('');
  const [journalDescription, setJournalDescription] = useState('');


  useEffect(() => {
    const storedJournals = localStorage.getItem('journals');
    if (storedJournals) {
      setJournals(JSON.parse(storedJournals))
    }
  }, [])

  const handleJournalClick = (id) => {
    const selected = journals.find(journal => journal.id === id);
    setSelectedJournal(selected);
    setShowJournalForm(false);
  };

  const handleAddButtonClick = () => {
    setShowJournalForm(true);
    setSelectedJournal(null);
  };

  const handleFormClose = () => {
    setShowJournalForm(false);
  };

  const addJournal = () => {
    const updatedJournals = [...journals];
    const newJournal = {
      id: updatedJournals.length + 1,
      title: journalTitle,
      description: journalDescription,
      date: new Date().toISOString().split('T')[0]
    };
    console.log(newJournal);

    updatedJournals.push(newJournal);
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));
    setShowJournalForm(false);

    setJournalTitle('');
    setJournalDescription('');
  }

  const deleteJournal = (id) => {

    const updatedJournals = [...journals];
    const index = journals.findIndex(journal => journal.id === id);
    console.log(index + 1)
    updatedJournals.splice(index, 1);
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));
    setSelectedJournal(null);
  }

  return (
    <>
      <center><h2 className='jounal-head'>Jounals</h2> </center>
      <div className='container'>
        <div className='jounal-left'>
          <center><div className='header'>Jounals</div></center>
          <div className='jounal-container'>
            {journals.map((journal, index) => (

              <div key={index} className='jounal-box' onClick={() => handleJournalClick(journal.id)}>
                <div>
                  <div className='journal-title'>{journal.title}</div>
                  <div className='journal-des'>{journal.description}</div>
                  <div className='journal-date'>edit {journal.date}</div>
                </div>

                  <button className='delete-btn visible' onClick={() => selectedJournal && deleteJournal(selectedJournal.id)}>
                    <box-icon type='solid' color="white" name='message-alt-x'></box-icon>
                  </button>
                </div>
      


            ))}
          </div>
          <div className='add-btn' onClick={handleAddButtonClick}>
            <button >
              <box-icon size='lg' color="#494AB1" name='plus-circle'></box-icon>
            </button>
          </div>

        </div>


        <div className='jounal-right'>
          {selectedJournal && (
            <div className='full-content'>
              <div className='title'>{selectedJournal.title}</div>
              <div className='desc'>{selectedJournal.description}</div>
              <div className='date'>{selectedJournal.date}</div>


            </div>
          )}

          {showJournalForm && (

            <div className='journal-form'>


              <div className='close-btn' onClick={handleFormClose}>
                <span role="img" aria-label="delete">
                  ❌
                </span>
              </div>
              <div className="form">
                <input
                  className="input"
                  placeholder="Type your Title"
                  required=""
                  type="text"
                  // value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                />
                <span className="input-border"></span>
              </div>
              <div className="form">
                <textarea
                  className="input01"
                  placeholder="Type your Journal"
                  required=""
                  onChange={(e) => setJournalDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form">
                <input className="input" placeholder="Type your Title" required="" type="hidden" />
                <span className="input-border"></span>
              </div>

              <center><button type="button" className="submit-btn" onClick={addJournal} id="bottone1"><strong>submit</strong></button></center>

            </div>
          )}
        </div>
      </div>
    </>

  )
}
