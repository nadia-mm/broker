import { Request, Response } from 'express';
import Broker from './Broker.model';


export const findBrokerByName =  async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : 0;

    try {
        const brokers = await Broker.find({ name: new RegExp(search, 'i') })
            .skip(cursor)
            .limit(10)
            .exec();

        res.status(200).json(brokers);
    } catch (error) {
        res.status(400).send({ message: `${error}` });
    }
};

export const createBroker = async (req: Request, res: Response) => {
    const { name, address, city, country } = req.body;

    const newBroker = new Broker({ name, address, city, country });

    try {
        await newBroker.save();
        res.status(201).json(newBroker);
    } catch (error) {
        res.status(400).send({ message: `${error}` });
    }
};