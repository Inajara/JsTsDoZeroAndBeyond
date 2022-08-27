import { DataTypes } from 'sequelize'
import { ApplicationDbSettings } from '../src/database'

export const PalavrasModel = ApplicationDbSettings.define('palavras', {
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    termo: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})