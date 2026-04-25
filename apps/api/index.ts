import express from "express";
import router from "./routes/route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/excalidraw/v1/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
