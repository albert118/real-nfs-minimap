import pandas as pd
from os import path

fn = path.join('.', 'NSW Speed Camera Locations',
               'NSW Speed Camera Locations.csv')
df = pd.read_csv(fn)

# ensure all columns are lower case
df.columns = [col.lower() for col in df.columns]

# remove unwated columns
df = df.drop(axis=1, columns=[
    'gx_media_links',  # don't need the media link
    'z',  # we don't need a z-axis for lat + long
])

# rename columns
df = df.rename(columns={
    "thanks to": 'accreditation'
})

# merge various "description" columns
description_cols = ['suburb', 'careful', 'coffs harbour', 'fyi', 'info', 'note',
                    'note2', 'sands', 'sans souci', 'tweed heads west', 'warning', 'wiley park']

df['description'] = df['description'].fillna('')
for col in description_cols:
    df['description'] = df['description'] + df[col].fillna('')

# remove previous "description" columns
df = df.drop(axis=1, columns=description_cols)

# show a preview of the resultant df
print(df.head())

# persist the updated df in a new file
new_fn = 'speed_cameras_nsw.csv'
print('saving to ' + new_fn)
df.to_csv(new_fn)
