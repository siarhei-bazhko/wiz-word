import * as React from 'react';
import { List, Button } from 'react-native-paper';

const ListItem: React.FC<{}> = ({ word: { refId, id, origin, translation, color }, key, userToken, deleteWord }: any) => {
  return <List.Item
    key={key}
    title={translation}
    description={origin}
    style={{backgroundColor:color, marginTop: 5, marginHorizontal: 10, borderRadius:20,         shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,}}
    left={() => <List.Icon  icon="star-circle" />}
    right={()=> <Button icon="cancel" color="darkred" style={{alignSelf:"center"}} onPress={()=>deleteWord(refId, userToken)} />}
  />
};

export default ListItem;
