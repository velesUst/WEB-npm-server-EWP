import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/login/counterSlice';
import loginReducer from '../features/login/loginSlice';
import chartMarkupReducer from '../features/chartMarkup/chartMarkupSlice';
import wavesForecastReducer from '../features/wavesForecast/wavesForecastSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    longin: loginReducer,
    chartMarkup: chartMarkupReducer,
    wavesForecast: wavesForecastReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
