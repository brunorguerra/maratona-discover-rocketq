const Database = require("../db/config");

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId;
    let isRoom = true;

    while (isRoom) {
      for (let i = 0; i < 6; i++) {
        i === 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      const roomsExistIds = await db.all(`SELECT id FROM rooms`);
      isRoom = roomsExistIds.some((roomExistId) => roomExistId === roomId);

      if (!isRoom) {
        await db.run(
          `INSERT INTO rooms (id, pass) 
          VALUES (${Number(roomId)}, '${pass}')`
        );
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },
  async open(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    let isNoQuestions;

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    );
    const questionsRead = await db.all(`
      SELECT * FROM questions WHERE room = ${roomId} and read = 1
    `);

    if (questions.length == 0 && questionsRead.length == 0) {
      isNoQuestions = true;
    }

    res.render("room", { roomId, questions, questionsRead, isNoQuestions });
  },
  async enter(req, res) {
    const db = await Database();
    const roomId = req.body.roomId;

    const roomsExistIds = await db.all(`SELECT id FROM rooms`);
    if (roomsExistIds.some((roomExistId) => roomExistId.id == roomId)) {
      res.redirect(`/room/${roomId}`);
    } else {
      res.render("roominvalid", { roomId: roomId });
    }
  },
};
