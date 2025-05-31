import React, { useState } from 'react';

const BookCheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    books: [],
    checkoutDate: '',
    agreement: false
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
    if (name === 'books') {
      const updatedBooks = formData.books.includes(value)
        ? formData.books.filter((b) => b !== value)
        : [...formData.books, value];

      if (updatedBooks.length <= 3) {
        setFormData({ ...formData, books: updatedBooks });
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.books.length === 0) {
      alert('Please select at least one book.');
      return;
    }

    if (!formData.agreement) {
      alert('You must agree to the terms to proceed.');
      return;
    }

    console.log('Form Submitted:', formData);
    // Add submission logic here
  };

  return (
    <div className="form-container">
      <h1>GOD Kids Library Book Checkout</h1>
      <p><strong>If you are a child and want to check out a book, please ask an adult to fill this form out!</strong></p>

      <form onSubmit={handleSubmit}>
        <label>Full Name *</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Books you want to check out (MAXIMUM OF 3) *</label>
        <div className="book-checkboxes">
          {booksList.map((book, index) => (
            <label key={index} className="book-option">
              <input
                type="checkbox"
                name="books"
                value={book}
                checked={formData.books.includes(book)}
                onChange={handleChange}
              />
              {book}
            </label>
          ))}
        </div>

        <label>Checkout Date (RETURN BY 2 WEEKS OF CHECKOUT DATE) *</label>
        <input type="date" name="checkoutDate" value={formData.checkoutDate} onChange={handleChange} required />

        <label>
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            required
          />
          By borrowing books from the library, I understand and agree that I am fully responsible for their care. If any book is lost, damaged, or not returned, I accept full responsibility and any consequences that may follow.
        </label>

        <button type="submit">Submit Book Checkout</button>
      </form>
    </div>
  );
};

export default BookCheckoutForm;
