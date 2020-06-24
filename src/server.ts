/* eslint-disable no-undef */
import app from './App';

app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`working at ${process.env.PORT}`),
);
