const groupeModel = require("../models/groupe.model");
const Groupe = require("../models/groupe.model"); 

const groupCreation = async (req, res) => {
  try {
    const { NomDeGroupe, Abbreviation, enseignant } = req.body;
    const groupe = new Groupe({ NomDeGroupe, Abbreviation, enseignant });
    await groupe.save();
    res.json({ message: "Groupe créé avec succès", groupe });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création du groupe" });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Find the user and group by their IDs
    const group = await Groupe.findById(groupId);

    if (!group) {
      return res.status(404).send({ error: "Group not found" });
    }

    // Add the user to the group's users array if not already present
    if (!group.users.includes(userId)) {
      group.users.push(userId);
    }

    // Save the updated user and group documents
    await group.save();

    return res.send({ group });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de l'ajout d'eleve à la groupe" });
  }
};

const findAllGroupe = async (req, res) => {
  const groupe = await groupeModel.find();
  return res.send(groupe);
};

const deleteGroupe = async (req, res) => {
  const groupe = await groupeModel.deleteOne({ _id : req.params.id });
  return res.send(groupe);
};

module.exports.groupeController = {
  groupCreation,
  addUserToGroup,
  findAllGroupe,
  deleteGroupe

};
