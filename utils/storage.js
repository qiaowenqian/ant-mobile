
import React, { Component } from 'react'

export default class Storage extends React.Component {


	static setSession(key, value) {
		if (sessionStorage) {
			sessionStorage.setItem(key, value);
		}
	}
	static getSession(key) {
		if (sessionStorage) {
			const date = sessionStorage.getItem(key);
			try {
				return JSON.parse(date);
			} catch (e) {
				return date;
			}
		}
	}

	static removeSession(key) {
		if (sessionStorage) {
			sessionStorage.removeItem(key);
		}
	}
	static setLocal(key, value) {
		if (localStorage) {
			localStorage.setItem(key, value);
		}
	}
	static getLocal(key) {
		if (localStorage) {
			return localStorage.getItem(key);
		}
	}

	static removeLocal(key) {
		if (localStorage) {
			localStorage.removeItem(key);
		}
	}

	//注销
	static write() {
		this.removeSession('user', { path: '/' });
	}
	//登录
	static login(user) {
		this.setSession('user', JSON.stringify(user)); console.log(user)
	}
	//设置手机版本
	static setPhoneVersion(version) {
		this.setSession('phoneVersion', version);
	}
}