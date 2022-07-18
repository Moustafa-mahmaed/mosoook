
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar, Platform, Image, TextInput } from 'react-native'



class forgetpasswordcode extends Component {

  constructor(props) {
    super(props)
    this.inputRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),



    ]

  }


  //     formDefinition = {

  //       onSubmit: ({  value1, value2 ,value3 ,value4 }) => {
  //          if (this.props.valid) {
  //       const { dispatch } = this.props;
  //       dispatch(
  //        userActions.verification(
  //           value1, value2 ,value3 ,value4 ,
  //           this.props.navigation
  //         )
  //       );
  //     } else {
  //       alertActions.error("الكود الذى ادخلته غير صحيح");
  //     }

  //         var object={
  //   value1, value2 ,value3 ,value4
  //         }
  //         console.log(object);
  //         //  this.props.login(object)
  //       },
  //       initialValues: {
  //          value1:"",
  //           value2:"" ,
  //           value3:"" ,
  //           value4:""
  //       },
  //       validationSchema: Yup.object().shape({
  //         value1: Yup.string() 
  //           .required('validation.required'),
  //           value2: Yup.string() 
  //           .required('validation.required'),
  //           value3: Yup.string() 
  //           .required('validation.required'),
  //           value4: Yup.string() 
  //           .required('validation.required'),
  //            })
  //     }



  _goNextAfterEdit(index) {
    if (index < this.inputRefs.length - 1) {

      // arr.splice(index, 0, `value +${index}`);
      // console.log(arr);
      //  this.setState({

      //  })
      this.inputRefs[index + 1].focus()

    }
  }

  onChangeText = (idx, val) => {
    console.log(idx);
    this.setState({ ["value" + idx]: val }, function () {
      console.log("br:" + this.state.value0);
    })

  }

  renderForm = () => {

    const { fetching, errors } = this.props
    return (

      <Formik
        {...this.formDefinition}
        render={props => {

          return (

            <View style={styles.container}>

              <View style={{
                flexDirection: 'row-reverse'
                , alignItems: "center", justifyContent: 'center',
              }}>



                <TextInput maxLength={1}
                  style={{ backgroundColor: "#DDDDDD", width: 60, borderRadius: 8, marginHorizontal: 5, }}
                  keyboardType={'numeric'}

                  onChange={() => this.inputRefs[1].focus()} ref={r => this.inputRefs[0] = r}
                />
                <TextInput maxLength={1} style={{ backgroundColor: "#DDDDDD", width: 60, borderRadius: 8, marginHorizontal: 5, }}
                  keyboardType={'numeric'}

                  onChange={() => this.inputRefs[2].focus()} ref={r => this.inputRefs[1] = r}
                />
                <TextInput maxLength={1} style={{ backgroundColor: "#DDDDDD", width: 60, borderRadius: 8, marginHorizontal: 5, }}
                  keyboardType={'numeric'}

                  onChange={() => this.inputRefs[3].focus()} ref={r => this.inputRefs[2] = r}
                />
                <TextInput maxLength={1} style={{ backgroundColor: "#DDDDDD", width: 60, borderRadius: 8, marginHorizontal: 5, }}
                  keyboardType={'numeric'}

                  onChange={() => this.inputRefs[3].focus()} ref={r => this.inputRefs[3] = r}
                />

              </View>



            </View>

          )
        }
        }
      />
    )
  }




  render() {
    return (
      <ScrollView>
        {this.renderForm()}
      </ScrollView>

    )
  }
}

export default forgetpasswordcode;