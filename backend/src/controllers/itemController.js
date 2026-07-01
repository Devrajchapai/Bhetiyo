export const storeItem = (req, res) => {
  const imageLink = req.uploadedData;
  res.json({ message: "Store item is called successflly", data: imageLink });
};
