import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet

# Create usable function
def get_polynomial_function(pace_each_day, specific_days, degree=1, model_to_use="ridge", alpha=0):

  # Transform data
  x = pd.DataFrame(specific_days)
  y = pd.DataFrame(pace_each_day)

  # Prepare and set hyperparameters
  polynomial_features = PolynomialFeatures(degree=degree, include_bias=False)
  x_poly = polynomial_features.fit_transform(x)

  # Train model
  if model_to_use == "ridge":
    model = Ridge(alpha=alpha, solver="cholesky") # Ridge regression with polynomial features
  elif model_to_use == "lasso":
    model = Lasso(alpha=alpha) # Lasso regression with polynomial features
  elif model_to_use == "elastic_net":
    model = ElasticNet(alpha=alpha, l1_ratio=0.5) # Elastic net regression with polynomial features (mix of ridge and lasso)
  else:
    model = LinearRegression() # Using regular polynomial regression

  model.fit(x_poly, y)
  if model_to_use == "lasso" or model_to_use == "elastic_net":
    intercept, coefficients = model.intercept_[0], model.coef_
  else:
    intercept, coefficients = model.intercept_[0], model.coef_[0]

  return intercept, coefficients

def visualize_function(intercept, coefficients, pace_each_day, days_ran, number_of_future_days, label):
  plt.legend()
  x_axis_representation = np.arange(0, number_of_future_days)
  
  polynomial_function = intercept

  for index, single_coefficient in enumerate(coefficients):
    polynomial_function += single_coefficient * (x_axis_representation ** (index + 1))
  
  plt.plot(x_axis_representation, polynomial_function, label=label)
  plt.scatter(days_ran, pace_each_day)


def predict_specific_value(intercept, coefficients, day):
  polynomial_function = intercept

  for index, single_coefficient in enumerate(coefficients):
    polynomial_function += single_coefficient * (day ** (index + 1))
  
  return polynomial_function