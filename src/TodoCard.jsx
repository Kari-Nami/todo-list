import React from 'react'
import { motion } from "motion/react";
import './todo-card.css'

const container = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 1}}
}

const item = {
    hidden: {opacity: 0, x: -10},
    visible: {opacity: 1, x: 0}
}

export const TodoCard = () => {

    const features = ["fast", "fun", "slow", "boring"]

    return (
        <motion.ul variants={container} initial="hidden" animate="visible">
            {features.map((feature) => (
                <motion.li key={feature} variants={item}>
                    {feature}
                </motion.li>
            ))}
        </motion.ul>
    )
}
