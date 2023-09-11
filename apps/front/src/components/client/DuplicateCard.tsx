import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { utilities } from '../../../tailwind.config'
import { texts } from '../../texts'
import CardContainer from '../CardContainer'

const DuplicateCard = ({ onUpdateValidationData, subject }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  return (
        <View>

            {subject.map((duplicate) => (
                <View key={duplicate.original._id}>
                    <CardContainer color={utilities.theme.colors.primary} height={160}>
                        <Text style={styles.text}>
                            {texts.component.originalLabel} <br/>
                            {texts.component.operationLabel} {duplicate.original.operation}, <br/>
                            {texts.component.dateLabel} {formatDate(duplicate.original.date)} <br/>
                            {texts.component.wordingLabel} {duplicate.original.wording} <br/>
                            {texts.component.amountLabel} {duplicate.original.amount} $
                        </Text>
                        <TouchableOpacity
                            onPress={() => onUpdateValidationData(duplicate.original.uuid)}>
                            <Text style={styles.textDelete}>{texts.component.deleteButtonLabel}</Text>
                        </TouchableOpacity>
                    </CardContainer>

                    <CardContainer color={utilities.theme.colors.primary} height={160}>
                        <Text style={styles.text}>
                            {texts.component.duplicateLabel} <br/>
                            {texts.component.operationLabel} {duplicate.duplicate.operation}, <br/>
                            {texts.component.dateLabel} {formatDate(duplicate.duplicate.date)} <br/>
                            {texts.component.wordingLabel} {duplicate.duplicate.wording} <br/>
                            {texts.component.amountLabel} {duplicate.duplicate.amount} $
                        </Text>
                        <TouchableOpacity
                            onPress={() => onUpdateValidationData(duplicate.original.uuid)}>
                            <Text style={styles.textDelete}>{texts.component.deleteButtonLabel}</Text>
                        </TouchableOpacity>
                    </CardContainer>
                </View>
            ))}
        </View>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: utilities.theme.colors.secondary
  },
  textDelete: {
    textAlign: 'center',
    color: utilities.theme.colors.warning,
    fontSize: 20,
    fontWeight: 'bold'
  }

})

export default DuplicateCard
