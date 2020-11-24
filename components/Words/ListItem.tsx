import * as React from 'react';
import { List, Button } from 'react-native-paper';

const ListItem: React.FC<{}> = ({ word: { id, origin, translation }, deleteWord}: any) => {
  return <List.Item
    title={translation}
    description={origin}
    left={() => <List.Icon  icon="star-circle" />}
    right={()=> <Button icon="cancel" color="darkred" onPress={()=>deleteWord(id)} />}
  />
};

export default ListItem;
