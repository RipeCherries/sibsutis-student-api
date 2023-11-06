module.exports.updateData = (req, res) => {
    console.log("Notify Update");

    return res.status(200).json({ message: "Эндпоинт для уведомления, о наличии обновлений" });
}
