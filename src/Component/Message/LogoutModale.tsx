import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({visible, onConfirm, onCancel}: LogoutModalProps) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, {opacity: opacityValue}]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{scale: scaleValue}],
              opacity: opacityValue,
            },
          ]}>
          <LinearGradient
            colors={['#1A1A2E', '#16213E']}
            style={styles.gradientContainer}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="exit-to-app"
                size={40}
                color="#E94560"
                style={styles.icon}
              />
            </View>

            {/* Text Content */}
            <Text style={styles.title}>Logout?</Text>
            <Text style={styles.subtitle}>
              Are you sure you want to log out?
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}>
                <LinearGradient
                  colors={['#E94560', '#FF6B6B']}
                  style={styles.confirmGradient}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}>
                  <Text style={styles.confirmButtonText}>Log Out</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientContainer: {
    padding: 25,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(233,69,96,0.2)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  icon: {
    shadowColor: '#E94560',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    color: '#8F8F8F',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3D3D3D',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default LogoutModal;
