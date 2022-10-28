import React from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from './form/ContactForm'
import { Filter } from './filter/filter';
import { ContactList } from './contactsList/contactsList';
import { useState, useEffect } from "react";

export const App = () => {

  const primaryContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? primaryContacts
  );

  const [filter, setFilter] = useState('');

   const addTodo = newUser => {
    const userSearch = contacts.find(
      ({ name }) => name === newUser.name
    );
    userSearch
      ? alert(`${userSearch.name} is already in contacts.`)
      : setContacts(prevState => [...prevState, { ...newUser, id: nanoid() }])};
  

   const changeFilter = event => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  };
  
   const filterContacts = () => {
    if (filter) {
      return contacts.filter(({ name }) =>
        name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    }
    return contacts;
   }
  
  	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

   const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId )
    )
  }


    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addTodo} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList filterList={filterContacts} onDelete={deleteContact} />
        </>
    )
  }


