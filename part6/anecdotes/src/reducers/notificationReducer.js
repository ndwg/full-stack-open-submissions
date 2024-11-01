import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(notificationChange(content))
        setTimeout(() => {
            dispatch(notificationChange(''))
          }, time*1000)
    }
}

export default notificationSlice.reducer