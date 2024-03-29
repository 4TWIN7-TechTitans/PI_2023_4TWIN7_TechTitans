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
    model = joblib.load("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/modelclaim.joblib")
    fenc = joblib.load("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/fenc.joblib")
    tenc = joblib.load("C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/2enc.joblib")
    # df = pd.read_csv('C:/PI_2023_4TWIN7_TechTitans/back/scripts/ClaimData.csv')
    df = pd.read_csv('C:/repos/PI_2023_4TWIN7_TechTitans/back/scripts/unseulentree.csv')
    # df = pd.read_csv('C:/PI_2023_4TWIN7_TechTitans/back/scripts/unseulentree.csv')
    # X_df = pd.DataFrame(df, columns=["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"])
    
    # features = X_df[["injured" , "circumstances_a" , "circumstances_b", "material_damage", "hits_a" , "hits_b" , "apparent_damages_a" , "apparent_damages_b"]]
    

    def extract_datetime_components(df):
        for column_name in df.select_dtypes(include=['datetime']).columns:
            df[column_name + '_year'] = df[column_name].dt.year
            df[column_name + '_month'] = df[column_name].dt.month
            df[column_name + '_day'] = df[column_name].dt.day
            df[column_name + '_hour'] = df[column_name].dt.hour
            df[column_name + '_minute'] = df[column_name].dt.minute
            df[column_name + '_second'] = df[column_name].dt.second
            df = df.drop(column_name, axis=1)
        return df
    
    
    df = extract_datetime_components(df)
    #print(df)

    categorical_data = df.select_dtypes(include=['object']).columns

    def encode_categorical_data(data,categorical_data):
        for column in categorical_data:
            unique_values = data[column].nunique()
            if unique_values == 2:
                # Use label encoding for binary data
                data[column] = fenc.fit_transform(data[column])
            if unique_values> 2 and unique_values< 6 :
                encoded_values = tenc.fit_transform(data[[column]])
                new_columns = [column + '_' + str(i) for i in range(unique_values)]
                encoded_df = pd.DataFrame(encoded_values.toarray(), columns=new_columns)
                data = pd.concat([data, encoded_df], axis=1)
                # Drop the main column after encoding
                data.drop(column, axis=1, inplace=True)
            else:
                # Use count encoding for categorical data with more than 2 unique values
                counts = data[column].value_counts()
                data[column] = data[column].map(counts)
        return data

    df= encode_categorical_data(df, categorical_data)

    df = df.drop("is_claim", axis=1).values
    # row = data_array[1998]  # Since array indexing starts from 0, row 1998 will be at index 1997
    # print(df)
    prediction = model.predict(df)    
    # prediction = model.predict([row])
    # print("Prediction for row 1998:", prediction) 
    return prediction
if __name__ == '__main__':

    prediction = claimP()
    if prediction[0] == 0:
        result = "is claim"
    else:
        result = "is not claim"
    print(result)
#    predictions_json = json.dumps(prediction.tolist())
#    with open("predictions.dump", 'w') as f:
#       f.write(predictions_json)
#    print(prediction)