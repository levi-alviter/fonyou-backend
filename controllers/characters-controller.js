const HttpError = require("../models/http-error");

const getSingleCharacterById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await fetch(
      `${process.env.URL_RICKANDMORTY_API}/character/${id}`
    );

    if (!response.ok) {
      return next(new HttpError("Fetching single character failed!"));
    }

    const responseData = await response.json();

    res.status(200).json(responseData);
  } catch (e) {
    console.error(e);
  }
};

const getCharacterByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    
    const response = await fetch(
      `${process.env.URL_RICKANDMORTY_API}/character/?name=${name}`
    );

    if (!response.ok) {
      return next(new HttpError("Fetching characters failed!"));
    }

    const responseData = await response.json();

    const cleanedData = responseData.results.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      gender: character.gender,
      location: character.location.name,
      image: character.image,
    }));

    res.status(200).json(cleanedData);
  } catch (e) {
    console.error(e);
  }
};

exports.getSingleCharacterById = getSingleCharacterById;
exports.getCharacterByName = getCharacterByName;