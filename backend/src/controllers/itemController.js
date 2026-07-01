export const storeItem = (req, res) => {
  const imageLink = req.uploadedImages;
  res.json({ message: "Store item is called successflly", data: imageLink });
};
