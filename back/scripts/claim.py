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

def claim():
    data = pd.read_csv("./ClaimData.csv")
    unique_values = len(data['is_claim'].unique())
    print("Number of unique values in 'isclean' feature:", unique_values)
    print(data)
    data.columns
    data.info()
    def drop_columns_with_no_data(data):
    #    Get a list of all columns with 0 non-null values
        cols_to_drop = data.columns[data.notnull().sum() < 5]
    
    # Drop the columns from the DataFrame
        data = data.drop(cols_to_drop, axis=1)
        data = data.rename(columns={'model': 'vehicule_identity_a.brand'})    
        data = data.rename(columns={'segment': 'vehicule_identity_a.type'})    
        return data
    data = drop_columns_with_no_data(data)
    data.info()
    # count the number of duplicated rows
    num_duplicated_rows = data.duplicated().sum()

    # print the number of duplicated rows
    print(num_duplicated_rows)

    # drop the duplicated rows
    data = data.drop_duplicates()

    # print the shape of the cleaned data
    print("Shape of the cleaned data:", data.shape)
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
    data = extract_datetime_components(data)
    data.info()

    # Separate the column names by data type
    categorical_data = data.select_dtypes(include=['object']).columns
    numeric_data = data.select_dtypes(include=['float64', 'int64']).columns
    def meanImputation(data,numeric_data):
    
        for column in numeric_data:
            if data[column].isnull().sum() > 0:
                [column].fillna(data[column].mean(), inplace=True)
        return data
    data = meanImputation(data,numeric_data)

    def medianImputation(data, numeric_data):
        for column in numeric_data:
            if data[column].isnull().sum() > 0:
                data[column].fillna(data[column].median(), inplace=True)
        return data

    data = medianImputation(data, numeric_data)

    def modeImputation(data, categorical_data):
        for column in categorical_data:
            if data[column].isnull().sum() > 0:
                mode_value = data[column].mode()[0]
                data[column].fillna(mode_value, inplace=True)
        return data
    data = modeImputation(data, categorical_data)

    data.info()

    def encode_categorical_data(data,categorical_data):
        for column in categorical_data:
            unique_values = data[column].nunique()
            if unique_values == 2:
                # Use label encoding for binary data
                encoder = LabelEncoder()
                data[column] = encoder.fit_transform(data[column])
            if unique_values> 2 and unique_values< 6 :
                # Use one-hot encoding for binary data
                encoder = OneHotEncoder()
                encoded_values = encoder.fit_transform(data[[column]])
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
    data = encode_categorical_data(data,categorical_data)
    data.info()
    X = data.drop('is_claim', axis=1)
    y = data['is_claim']
    X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)
    print(data)

    # Create an instance of the Random Forest Classifier
    rf = RandomForestClassifier()

    # Define the parameter grid for the Random Forest Classifier
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 5, 10],
        'min_samples_split': [2, 5, 10]
    }

    # Perform grid search with cross-validation
    grid_search = GridSearchCV(rf, param_grid, cv=5)
    grid_search.fit(X_train, y_train)

    # Get the best hyperparameters and the best model
    best_params = grid_search.best_params_
    best_model = grid_search.best_estimator_

    # Evaluate the performance of the best model on the testing set
    y_pred = best_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    print(accuracy)
    joblib.dump(best_model, 'modelclaim.joblib')
#     print(data) 
#     data_array = data.drop("is_claim", axis=1).values
#     row = data_array[1998]  # Since array indexing starts from 0, row 1998 will be at index 1997
#     prediction = best_model.predict([row])
#     print("Prediction for row 1998:", prediction) 
   

claim()