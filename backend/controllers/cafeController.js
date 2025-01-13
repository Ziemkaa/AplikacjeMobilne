const Cafe = require('../models/cafe');

// GET /api/cafes
exports.getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find().select('-comments'); 
    // .select('-comments') -> żeby nie pobierać całych komentarzy na liście
    res.json(cafes);
  } catch (error) {
    console.error('Error getting cafes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/cafes/:id
exports.getCafeById = async (req, res) => {
  const { id } = req.params;

  try {
    const cafe = await Cafe.findById(id)
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' }
      });

    if (!cafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }

    res.status(200).json(cafe); // Zwróć szczegóły kawiarni z opisem
  } catch (error) {
    console.error('Error fetching cafe details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/cafes (tylko admin)
exports.createCafe = async (req, res) => {
  const { name, location, description } = req.body;

  try {
    const newCafe = new Cafe({
      name,
      location,
      description, // Przypisz opis
    });

    const savedCafe = await newCafe.save();
    res.status(201).json(savedCafe);
  } catch (error) {
    console.error('Error adding cafe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/cafes/:id (tylko admin)
exports.updateCafe = async (req, res) => {
  const { id } = req.params;
  const { name, location, description } = req.body;
  try {
    const updatedCafe = await Cafe.findByIdAndUpdate(
      id,
      { name, location, description },
      { new: true }
    );
    if (!updatedCafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }
    res.json(updatedCafe);
  } catch (error) {
    console.error('Error updating cafe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/cafes/:id (tylko admin)
exports.deleteCafe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCafe = await Cafe.findByIdAndRemove(id);
    if (!deletedCafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }
    res.json({ message: 'Cafe deleted' });
  } catch (error) {
    console.error('Error deleting cafe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
