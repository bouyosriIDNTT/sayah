const testModel = require("../models/test.model");
const { authController } = require("./auth.router");


const getTests = async (req,res) => {
    try {
        const tests = await testModel.find();
        res.send(tests);
        return tests
    } catch (error) {
        console.log(error);
    }
};
const getTestById = async (req, res) => {
    try {
      // Retrieve the user from the JWT token
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Bearer header
      const user = await authController.getUserFromToken(token); // Assume getUserFromToken function is implemented
      console.log(user);

      // Fetch tests from the database based on specialite
      const specialiteId = req.params.specialiteId; // Assuming specialiteId is passed in the request parameters
      const tests = await testModel.find({ specialite: specialiteId }).lean();

      // Modify the tests array based on user type
      const modifiedTests = tests.map((test) => {
        // Loop through each reponse object and remove the isCorrect field
        const modifiedReponses = test.reponse.map((reponse) => {
          if (user && user.__t !== "Eleve") {
            return reponse;
          } else {
            const { isCorrect, ...rest } = reponse;
            return rest;
          }
        });

        // Create a new object without the isCorrect field in the reponse array
        const modifiedTest = { ...test, reponse: modifiedReponses };
        return modifiedTest;
      });

      res.send(modifiedTests);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
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
        const { id } = req.params;
        const { note } = req.body;

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

const getTestScore = async (req, res) => {
  try {
    // Retrieve the user from the JWT token
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Bearer header
    const user = await authController.getUserFromToken(token);

    // Validate user type
    if (!user || user.__t !== "Eleve") {
      return res
        .status(403)
        .send("Forbidden: Only students can submit test responses");
    }

    const { specialiteId, responses } = req.body; // Assuming specialiteId and responses are sent in the body

    // Fetch all tests with the given specialite ID from the database
    const tests = await testModel.find({ specialite: specialiteId }).lean();
    if (!tests || tests.length === 0) {
      return res.status(404).send("No tests found for the given specialite");
    }

    // Calculate the score
    let score = 0;
    tests.forEach((test) => {
      const studentResponse = responses.find(
        (response) => response.questionId === test._id.toString()
      );
      if (studentResponse) {
        const correctAnswer = test.reponse.find((ans) => ans.isCorrect);
        if (correctAnswer && correctAnswer.option === studentResponse.option) {
          score += 1;
        }
      }
    });

    res.send({ score });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};



module.exports = {
  getTestScore,
  getTestById
};