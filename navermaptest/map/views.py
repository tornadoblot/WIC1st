from django.shortcuts import render

def post_list(request):
	return render(request, 'map/post_list.html', {})