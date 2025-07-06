const { getStoredPublications, storePublications } = require('../data/publications');
const md5 = require('blueimp-md5');

// Obtener todas las publicaciones
exports.getAllPublications = async (req, res) => {
  const publications = await getStoredPublications();
  res.status(200).json({ publications });
};

// Obtener publicación por título (usando nombre como ID)
exports.getPublicationById = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const publications = await getStoredPublications();
  const pub = publications.find(p => p.title.trim().toLowerCase() === clave);
  if (!pub) return res.status(404).send('Publicación no encontrada');
  res.json({ publication: pub });
};

// Crear nueva publicación
exports.createPublication = async (req, res) => {
  const publications = await getStoredPublications();
  const { title, body, views, userId } = req.body;
  const clave = title.trim().toLowerCase();

  if (publications.some(p => p.title.trim().toLowerCase() === clave)) {
    return res.status(400).json({ message: 'Ya existe una publicación con ese título.' });
  }

  const newPublication = {
    title: clave,
    body,
    views,
    userId
  };

  await storePublications([newPublication, ...publications]);
  res.status(201).json({ message: 'Publicación creada.', publication: newPublication });
};

// Actualizar publicación por título
exports.updatePublication = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const publications = await getStoredPublications();
  const index = publications.findIndex(p => p.title.trim().toLowerCase() === clave);
  if (index === -1) return res.status(404).send('Publicación no encontrada');

  publications[index] = { ...publications[index], ...req.body };
  await storePublications(publications);
  res.json(publications[index]);
};

// Eliminar publicación
exports.deletePublication = async (req, res) => {
  const clave = req.params.id.trim().toLowerCase();
  const publications = await getStoredPublications();
  const filtered = publications.filter(p => p.title.trim().toLowerCase() !== clave);
  await storePublications(filtered);
  res.status(204).send();
};
