from ursina import *
from itertools import product

app = Ursina()

def parent_child_relationship(axis, layer):
    for w in cube:
        w.position, w.rotation = round(w.world_position, 1), w.world_rotation
        w.parent = scene

    center.rotation = 0

    for w in cube:
        if getattr(w.position, axis) == layer:
            w.parent = center


def input(key):
    if key not in rot_dict:
        return
    axis, layer, store = rot_dict[key]
    parent_child_relationship(axis, layer)
    shift = held_keys['shift']
    eval(f'center.animate_rotation_{axis}({-store if shift else store}, duration=0.5)')

window.borderless = False
window.size = (800, 800)
window.position = (2000, 200)
camera = EditorCamera()
camera.position = (0, 0, -10)  # Adjust the camera position

center = Entity()

rot_dict = {'u': ['y', 1, 90], 'e': ['y', 0, -90], 'd': ['y', -1, -90],
            'l': ['x', -1, -90], 'm': ['x', 0, -90], 'r': ['x', 1, 90],
            'f': ['z', -1, 90], 's': ['z', 0, 90], 'b': ['z', 1, -90]}

cube = []
for pos in product((-1, 0, 1), repeat=3):
    cube.append(Entity(model='Teil_46_model.obj', texture='Teil_46_texture.png', position=pos, scale=0.5))

app.run()
