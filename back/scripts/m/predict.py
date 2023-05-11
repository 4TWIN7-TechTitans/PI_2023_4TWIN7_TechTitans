import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import time
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler,MinMaxScaler,LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier,AdaBoostClassifier,GradientBoostingClassifier
from sklearn.metrics import accuracy_score,classification_report,confusion_matrix
from sklearn.model_selection import KFold # import KFold
import warnings
import pickle
import joblib
warnings.filterwarnings('ignore')


from sklearn.preprocessing import OrdinalEncoder

model = joblib.load("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/m/model.joblib")
OE_save = joblib.load("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/m/encoder.joblib")


#OE_save = pickle.load(open('Oencoder.pkl','rb'))
#model=pickle.load(open('model.sav','rb'))
# load your test dataset here
df_sample = pd.read_csv("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/m/check2.csv")


lists=['Vehicle_driver_relation', 'Work_of_casuality', 'Fitness_of_casuality','Day_of_week','Casualty_severity','Time','Sex_of_driver','Educational_level','Defect_of_vehicle','Owner_of_vehicle','Service_year_of_vehicle', 'Road_surface_type','Sex_of_casualty']
df_sample.drop(columns = lists, inplace=True)

cols = df_sample.columns


# convert numpy array to pandas dataframe
df_sample_tf = OE_save.transform(df_sample)
xs = pd.DataFrame(df_sample_tf,columns=cols)

test = xs["Accident_severity"]
dfx = xs.drop(columns=["Accident_severity"])


predictions=model.predict(dfx)

#accuracy = accuracy_score(test,predictions)

#accuracy

print(predictions)

# add prediction column to df
# invert the df
#dfx["Accident_severity"] = predictions
#inv_array = OE_save.inverse_transform(dfx)
#inv_df = pd.DataFrame(inv_array,columns=cols)

#inv_df


#print(inv_array)
#print(inv_df)
