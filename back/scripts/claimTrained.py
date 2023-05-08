import pandas as pd 
import numpy as np
from sklearn.impute import KNNImputer
from sklearn.preprocessing import OneHotEncoder , LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score 
from sklearn.model_selection import GridSearchCV
import joblib
import json

def claimP():
    model = joblib.load("model.joblib")
    df = pd.read_csv('C:/PI_2023_4TWIN7_TechTitans/back/scripts/ClaimData.csv')
    X_df = pd.DataFrame(df, columns=["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"])
    
    features = X_df[["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"]]
    
     
    data_array = df.drop("is_claim", axis=1).values
    row = data_array[1998]  # Since array indexing starts from 0, row 1998 will be at index 1997
    prediction = model.predict(X_df)
    # prediction = model.predict([row])
    print("Prediction for row 1998:", prediction) 
    return prediction
if __name__ == '__main__':

    prediction = claimP()
    if prediction[0] == 0:
        result = "is claim"
    else:
        result = "is not claim"
    print(result)
    predictions_json = json.dumps(prediction.tolist())
    with open("predictions.dump", 'w') as f:
       f.write(predictions_json)
    print(prediction)