import React, { useState } from 'react';

const BookReturnForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    books: [],
    returnDate: '',
    condition: '',
    conditionDetails: ''
  });

  const booksList = [
    'Malayalapaadhavali Pusthakam-0',
    'H&C Ezhuthan Padikkam Level 2',
    'H&C Easy Way ABC',
    'Poorna Malayalam Padavali',
    'DC Books Malayalam Padavali',
    'My Coloring Book of Ganesha',
    '3D Coloring Hanuman',
    'Sawan Coloring Book of Shiva',
    'DC Books Copy/Work Book',
    'H&C Ezhuthan Padikkam Level 4',
    'Priya Kaiyaksharam 2',
    'H&C Ezhuthan Padikkam Level 1',
    'PAICO Malayalam Alphabet',
    'H&C Thribhasha Aksharamaala',
    'DC Books Curriculum of Shresthabhasha',
    '23 Pictorial Stories for Children',
    'The Bhagavad Gita',
    "Aesop's Fable",
    "Shanti Children's Books Mythological Tales",
    'Akbar and Birbal Wisdom in a Pot',
    'Panchatantra Part 1',
    'The Story of Sri Krishna',
    'Gunapadam Kathakal',
    "Poorna Publications Aesop's Fables",
    'Moral Story for Kids',
    'The Bhagavad Gita for Children',
    'Rainbow Famous Moral Stories',
    'Akbar-Birbal Part 1',
    'Mulla Nasruddin',
    'The Monkey Tricks the Crocodile',
    'Early Days of Swami Vivekanandha',
    'Moral Stories',
    'Akbar-Birbal Part 2',
    'Sri Krishna for children',
    'Stories of Great Lord Shiva',
    'Cinderella',
    'Tales from Panchatantra',
    'Navneet Moral Stories',
    'Hitopadesh',
    'Shiva Shiva namah Shivaya',
    'Bala Bhagavatam',
    'Amar Chitra Katha Tales of Vishnu',
    'Treasury of Indian Tales Book 1'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'books') {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, books: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your submission logic here
  };

  return (
    <div className="form-container">
      <h1>GOD Kids Library Book Return</h1>
      <p className="notice">This is NOT the checkout form</p>
      <p><strong>This is the RETURN BOOKS form</strong></p>
      <p>AFTER COMPLETING THIS FORM, PLEASE KEEP BOOKS BACK ON SHELF IN AN ORDERLY MANNER</p>
      <form onSubmit={handleSubmit}>
        <label>Full Name *</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Books you are returning *</label>
        <select name="books" multiple value={formData.books} onChange={handleChange} required>
          {booksList.map((book, index) => (
            <option key={index} value={book}>{book}</option>
          ))}
        </select>

        <label>Book Return Date *</label>
        <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />

        <label>Condition Confirmation *</label>
        <input type="radio" name="condition" value="Same" checked={formData.condition === 'Same'} onChange={handleChange} required />
        I confirm that the book is being returned in the same condition as when borrowed.<br />

        <input type="radio" name="condition" value="Other" checked={formData.condition === 'Other'} onChange={handleChange} />
        Other:
        <textarea name="conditionDetails" value={formData.conditionDetails} onChange={handleChange} placeholder="Describe any damage..." />

        <button type="submit">Submit Book Return</button>
      </form>
    </div>
  );
};

export default BookReturnForm;
