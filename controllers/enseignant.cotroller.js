const testModel = require("../models/test.model");



const getTests = async (req,res) => {
    try {
        const tests = await testModel.find();
        res.send(tests);
        return tests
    } catch (error) {
        console.log(error);
    }
};


const createTest = async (req, res) => {
    try {
        const model = req.body.model;
        const specialiteId = req.body.specialite;

        const tests = [];

        for (const item of model) {
            const { question, reponse } = item;

            const formattedReponse = Object.entries(reponse).map(([option, isCorrect]) => ({
                option,
                isCorrect
            }));

            const test = await testModel.create({
                question,
                reponse: formattedReponse,
                specialite: specialiteId
            });

            tests.push(test);
        }

        res.json(tests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const UpdateNote = async (req, res) => {
    try {
        const { id } = req.params;  // Assume the record ID is passed as a URL parameter
        const { note } = req.body;  // Assume the new note is passed in the request body

        // Validate input
        if (!note) {
            return res.status(400).send({ error: "Note is required" });
        }

        // Find the record by ID and update the note
        const response = await testModel.findByIdAndUpdate(
            id, 
            { note: note },
            { new: true }  // This option returns the updated document
        );

        // Check if the record was found and updated
        if (!response) {
            return res.status(404).send({ error: "Record not found" });
        }

        return res.send(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports.enseignantController = {
    createTest,
    getTests,
    UpdateNote
};