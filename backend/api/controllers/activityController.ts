import { Request, Response } from 'express';
import Activity from '../models/Activity';

// Create a new activity
export const createActivity = async (req: Request, res: Response) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all activities
export const getActivities = async (req: Request, res: Response) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single activity by ID
export const getActivityById = async (req: Request, res: Response) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an activity by ID
export const updateActivity = async (req: Request, res: Response) => {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an activity by ID
export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};