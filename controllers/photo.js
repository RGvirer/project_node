export const getAllPhotos = async (req, res) => {
    try {
        let allPhotos = {};
        res.json(allPhotos);
    }
    catch (err) {
        res.status(400).send("not all Photos are available " + err.message);
    }
}