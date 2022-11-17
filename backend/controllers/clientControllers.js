const Client = require("../models/clientModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user._id });
  res.json(clients);
});

const createClient = asyncHandler(async (req, res) => {
  const { clientId, name, phone, joiningDate } = req.body;

  // const clientId = await Client.findOne({ id });

  // if (clientId) {
  //   res.status(400);
  //   throw new Error("Client Id already exists.");
  // }

  if (!clientId || !name || !phone || !joiningDate) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  } else {
    const client = new Client({
      user: req.user._id,
      clientId,
      name,
      phone,
      joiningDate,
    });

    const createdClient = await client.save();

    res.status(201).json(createdClient);
  }
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: "Client not found!" });
  }
});

const updateClient = asyncHandler(async (req, res) => {
  const { clientId, name, phone, joiningDate } = req.body;

  const client = await Client.findById(req.params.id);

  if (client.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (client) {
    client.clientId = clientId;
    client.name = name;
    client.phone = phone;
    client.joiningDate = joiningDate;

    const updatedClient = await client.save();

    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error("Client not found!");
  }
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (client) {
    await client.remove();
    res.json({ message: "Client removed successfully." });
  } else {
    res.status(404);
    throw new Error("Client not found!");
  }
});

module.exports = {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
};
