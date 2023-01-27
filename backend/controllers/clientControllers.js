const Client = require("../models/clientModel");
const asyncHandler = require("express-async-handler");

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user._id });
  res.json(clients);
});

const createClient = asyncHandler(async (req, res) => {
  const { clientId, name, phone, joiningDate, plan } = req.body;

  if (!clientId || !name || !phone || !joiningDate || !plan) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  } else {
    const client = new Client({
      user: req.user._id,
      clientId,
      name,
      phone,
      joiningDate,
      plan,
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
  const { clientId, name, phone, joiningDate, plan } = req.body;

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
    client.plan = plan;

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

const dashboard = asyncHandler(async (req, res) => {
  const clients = await Client.count();
  res.json(clients);

  // const sub = await Client.aggregate([
  //   {
  //     $project: {
  //       month: { $month: "$joiningDate" },
  //     },
  //   },
  // ]);

  //res.json(sub);

  const total = await Client.find(
    {},
    {
      _id: 0,
      user: 0,
      name: 0,
      plan: 0,
      clientId: 0,
      phone: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  console.log(total);

  // console.log(sub);
});

const accountSid = "AC38ec4d8803f24c83da7c1a569c1e6661";
const authToken = "4ab5330b5f838f20db0ec136b5b52b6e";
const client = require("twilio")(accountSid, authToken);

// const month = asyncHandler(async (req, res) => {
//   const sub = await Client.find();

//   //res.json(sub);

//   console.log(sub);
// });

module.exports = {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
  dashboard,
};
