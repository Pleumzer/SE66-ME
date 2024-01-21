import React from "react";
import { Layout } from "antd";
import SidebarAnimal from "../../component/sidebarAnimal";
import AnimalEdit from "../../pages/AnimalInfo/edit";
import ZooHeader from "../../component/zoo.Hearder";
const { Header, Content, Footer, Sider } = Layout;

function LayoutAnimalEdit (){
    return(
        <Layout style={{minHeight:'100vh'}}>
            <ZooHeader/>
            <Layout>
                <SidebarAnimal/>
                <Content>
                    <AnimalEdit/>  
                </Content>
            </Layout>
        </Layout>

    );
};
export default LayoutAnimalEdit;