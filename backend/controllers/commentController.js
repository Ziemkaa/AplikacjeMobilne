const Comment = require('../models/comment');
const Cafe = require('../models/cafe');

exports.addComment = async (req, res) => {
  const { cafeId } = req.params; // ID kawiarni
  const { text } = req.body; // Treść komentarza
  const userId = req.user.userId; // Pobierz ID użytkownika z tokenu JWT

  //console.log('Received data:', { cafeId, text, userId }); // Loguj dane

  try {
    // Sprawdź, czy istnieje kawiarnia
    const cafe = await Cafe.findById(cafeId);
    if (!cafe) {
      console.log('Cafe not found:', cafeId);
      return res.status(404).json({ message: 'Cafe not found' });
    }

    // Utwórz nowy komentarz
    const comment = new Comment({
      text,
      cafe: cafe._id,
      user: userId, // Dodaj ID użytkownika
    });
    await comment.save();

    // Dodaj komentarz do kawiarni
    cafe.comments.push(comment._id);
    await cafe.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
